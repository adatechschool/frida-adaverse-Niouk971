export const promotions = [
    { name: "Frida", startAt: new Date("2025-05-26") },
    { name: "Frances", startAt: new Date("2025-01-27") },
];

export const projects = [
    { type: "Adaopte", name: "Adaopte" },
    { type: "Ada Quiz", name: "Ada Quiz" },
    { type: "Ada Check Event", name: "Ada Check Event" },
    { type: "Adaence", name: "Adaence" },
    { type: "Adaverse", name: "Adaverse" },
    { type: "Dataviz", name: "Dataviz" },
];

// Ici on indique directement projectType et promoName
export const studentsProjects = [
    {
        projectType: "Adaopte",
        promoName: "Frida",
        title: "frida-adaopte-john",
        imageUrl: "https://example.com/adaopte-frida.jpg",
        customUrl: "https://adaopte.frida.example",
        githubUrl: "https://github.com/florian/adaopte-frida",
        demoUrl: "https://demo.example/adaopte-frida",
        publishedAt: new Date("2025-10-10"),
    },
    {
        projectType: "Ada Quiz",
        promoName: "Frances",
        title: "frances-ada-quiz-doe",
        imageUrl: "https://example.com/portfolios-ada.jpg",
        customUrl: "https://portfolios.ada.example",
        githubUrl: "https://github.com/florian/portfolios-ada",
        demoUrl: "https://demo.example/portfolios-ada",
        publishedAt: null,
    },
];
