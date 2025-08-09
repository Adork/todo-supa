'use server';
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()

export default async function addTodo (formData) {
    const title = formData.get('title')
    const priority= formData.get('priority') || 'Normal';
    try {
        await prisma.todo.create({
            data: {
                title, priority
            },
        });
        revalidatePath('/')
    } catch (e) {
        console.error(e);
    }

}