import Grade from "../models/Grade.js";

/**
 * Get all grades
 */
export async function getGrades(req, res) {
    try {
        const grades = await Grade.findAll();
        res.json(grades);
    } catch (err) {
        console.error("Error fetching grades:", err);
        res.status(500).json({ error: "Failed to fetch grades" });
    }
}

/**
 * Create a new grade
 */
export async function createGrade(req, res) {
    try {
        const { form, term, subject, grade } = req.body;
        // Basic validation
        if (
            typeof form !== "number" ||
            typeof term !== "number" ||
            !subject ||
            !grade ||
            form < 1 || form > 4 ||
            term < 1 || term > 3
        ) {
            return res.status(400).json({ error: "Invalid or missing fields" });
        }

        const newGrade = await Grade.create({ form, term, subject, grade });
        res.status(201).json(newGrade);
    } catch (error) {
        console.error("Error creating grade:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

/**
 * Update an existing grade
 */
export async function updateGrade(req, res) {
    try {
        const { id } = req.params;
        const { form, term, subject, grade } = req.body;

        // Check grade exists
        const gradeObj = await Grade.findByPk(id);
        if (!gradeObj) {
            return res.status(404).json({ error: "Grade not found" });
        }

        // Optional: validate incoming data
        await gradeObj.update({ form, term, subject, grade });
        res.json(gradeObj);
    } catch (error) {
        console.error("Error updating grade:", error);
        res.status(500).json({ error: "Failed to update grade" });
    }
}

/**
 * Delete a grade
 */
export async function deleteGrade(req, res) {
    try {
        const { id } = req.params;
        const gradeObj = await Grade.findByPk(id);
        if (!gradeObj) {
            return res.status(404).json({ error: "Grade not found" });
        }
        await gradeObj.destroy();
        res.json({ message: "Grade deleted" });
    } catch (error) {
        console.error("Error deleting grade:", error);
        res.status(500).json({ error: "Failed to delete grade" });
    }
}

/**
 * Export grades as CSV
 */
export async function exportGradesCSV(req, res) {
    try {
        const grades = await Grade.findAll();
        const header = "Form,Term,Subject,Grade\n";
        const rows = grades.map(g =>
            `${g.form},${g.term},${g.subject},${g.grade}`
        );
        res.header("Content-Type", "text/csv");
        res.attachment("grades_export.csv");
        res.send(header + rows.join("\n"));
    } catch (error) {
        console.error("Error exporting grades:", error);
        res.status(500).json({ error: "Failed to export grades" });
    }
}