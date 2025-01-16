"use client"

import { ChangeEvent, useState } from "react"

export const Form = ()=>{
    const [selectedFile, setSelectedFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>)=>{
        /* Não importa se foi escolhido só um arquivo, vai vim um array de files e dentro cada índice vem um file */
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];
            setSelectedFile(file);
        }

    }

    const handleSubmit = ()=>{

    }

    return (
        <div>
            <input type="file" className="block my-3" onChange={handleFileChange} />
            <button className="block my-3" onClick={handleSubmit}>Enviar</button>
        </div>
    )
}