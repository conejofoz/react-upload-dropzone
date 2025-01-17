"use client"

import { ChangeEvent, useState } from "react"

export const Form = ()=>{
    const [selectedFile, setSelectedFile] = useState<File>();
    const [legend, setLegend] = useState('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>)=>{
        /* Não importa se foi escolhido só um arquivo, vai vim um array de files e dentro cada índice vem um file */
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];
            setSelectedFile(file);
        }

    }

    const handleSubmit = async ()=>{
        if(selectedFile){
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('legend', legend)

            const req = await fetch('https://b7web.com.br/uploadtest/', {
                method: 'POST',
                body: formData
            });

            const json = await req.json();
            console.log(json);
        }
    }

    return (
        <div>
            <input type="file" className="block my-3" onChange={handleFileChange} />
            <input type="text" className="text-black" value={legend} onChange={e => setLegend(e.target.value)}  />
            <button className="block my-3" onClick={handleSubmit}>Enviar</button>
        </div>
    )
}