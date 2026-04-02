import express from "express";
import StudyPlan from "../models/StudyPlan.js";
import { generatePlan } from "../utils/ai.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

// POST /plans
router.post("/plans", protect, async (req, res) => {
    try {
        const { subject, deadline, difficulty } = req.body;

        const today = new Date();
        const endDate = new Date(deadline);

        const calculatedDays = Math.ceil(
            (endDate - today) / (1000 * 60 * 60 * 24)
        );

        if (calculatedDays <= 0) {
            return res.status(400).json({ message: "Invalid deadline" });
        }

        const days = Math.min(calculatedDays, 30);

        const aiPlan = await generatePlan(subject, days, difficulty);

        const formattedPlan = aiPlan.map(item => ({
            ...item,
            completed: false
        }));

        const newPlan = await StudyPlan.create({
            subject,
            deadline,
            difficulty,
            user: req.user.id,
            plan: formattedPlan
        });

        res.json(newPlan);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/plans", protect, async (req, res) => {
    try {
        const plans = await StudyPlan.find({ user: req.user.id })
            .sort({ createdAt: -1 });
        res.json(plans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/plans/:id/complete", protect, async (req, res) => {
    try {
        const { id } = req.params;
        const { day } = req.body;

        const studyPlan = await StudyPlan.findOne({
            _id: id,
            user: req.user.id
        });

        if (!studyPlan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        // find the specific day
        const task = studyPlan.plan.find(item => item.day === day);

        if (!task) {
            return res.status(404).json({ message: "Day not found" });
        }

        // mark complete
        task.completed = true;

        await studyPlan.save();

        res.json({ message: "Task marked complete", studyPlan });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/plans/:id/reschedule", protect, async (req, res) => {
    try {
        const { id } = req.params;

        // 1️⃣ find study plan
        const studyPlan = await StudyPlan.findOne({
            _id: id,
            user: req.user.id
        });
        if (!studyPlan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        // 2️⃣ get incomplete tasks
        const remainingTasks = studyPlan.plan.filter(task => !task.completed);

        const remainingDays = remainingTasks.length;

        if (remainingDays === 0) {
            return res.json({ message: "Nothing to reschedule" });
        }

        // 3️⃣ generate new AI plan
        const newPlan = await generatePlan(
            studyPlan.subject,
            remainingDays,
            studyPlan.difficulty
        );

        // 4️⃣ replace only incomplete tasks
        let index = 0;

        if (!newPlan || newPlan.length === 0) {
            return res.status(500).json({ message: "AI failed" });
        }

        studyPlan.plan = studyPlan.plan.map(task => {
            if (task.completed) return task; // keep completed


            const newTask = newPlan[index++] || { task: task.task };

            return {
                ...task,
                task: newTask.task
            };
        });

        // 5️⃣ save updated plan
        await studyPlan.save();

        // 6️⃣ send response
        res.json({
            message: "Plan rescheduled successfully",
            plan: studyPlan
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;