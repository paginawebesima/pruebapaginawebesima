import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProyectController{
    static createProject = async(req:Request,res:Response)=>{
        const project = new Project(req.body)
        try {
            await project.save()
            res.send('Proyecto creado correctamente')
        } catch (error) {
            console.log(error)
        }
    }
    static getAllProjects = async(req:Request,res:Response)=>{
        try {
            const projects = await Project.find({

            })
            const htmlResponse = `
                <html>
                <head>
                    <title>NodeJs y Express en Vercel</title>
                </head>
                <body>
                    <h1>Soy un proyecto Back end en vercel</h1>
                </body>
                </html>
            `;
            res.send(htmlResponse);
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
        
    }
    static getProjectById = async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const project = await Project.findById(id).populate('tasks')
            if(!project){
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({error:error.message})
            }
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }
    static updateProject = async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
           const project = await Project.findById(id)
           if(!project){
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({error:error.message})
            }
            project.clientName=req.body.clientName
            project.projectName=req.body.projectName
            project.description=req.body.description
           await project.save()
           res.send('Proyecto Actualizado')
        } catch (error) {
            console.log(error)
        }
    }
    static deleteProject = async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
           const project = await Project.findById(id)
           if(!project){
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({error:error.message})
            }
           await project.deleteOne()
           res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}