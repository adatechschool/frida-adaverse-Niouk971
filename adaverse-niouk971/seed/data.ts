import { ProjectCategory } from "@/lib/db/types";

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
    { type: "Portfolio", name: "Portfolio" },  
    { type: "Hackaton", name: "Hackaton" },    
];

// Ici on indique directement projectType, promoName et projectCategory
export const studentsProjects = [
    {
        projectType: "Adaopte",
        promoName: "Frida",
        projectCategory: ProjectCategory.Ada, // enum au lieu de string
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
        projectCategory: ProjectCategory.Ada,
        title: "frances-ada-quiz-doe",
        imageUrl: "https://example.com/portfolios-ada.jpg",
        customUrl: "https://portfolios.ada.example",
        githubUrl: "https://github.com/florian/portfolios-ada",
        demoUrl: "https://demo.example/portfolios-ada",
        publishedAt: null,
    },
    {
        projectType: "Portfolio", 
        promoName: "Frida",
        projectCategory: ProjectCategory.Personal,
        title: "frida-portfolio-jane",
        imageUrl: "https://example.com/portfolio-jane.jpg",
        customUrl: "https://portfolio.jane.example",
        githubUrl: "https://github.com/jane/portfolio",
        demoUrl: "https://demo.example/portfolio-jane",
        publishedAt: new Date("2025-11-15"),
    },
    {
        projectType: "Hackaton",
        promoName: "Frida",      
        projectCategory: ProjectCategory.Hackathon,
        title: "frida-hackaton-ai-team",
        imageUrl: "https://example.com/hackaton-ai.jpg",
        customUrl: "https://hackaton.ai.example",
        githubUrl: "https://github.com/team/hackaton-ai",
        demoUrl: "https://demo.example/hackaton-ai",
        publishedAt: new Date("2025-12-20"),
    },
];
