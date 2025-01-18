"use client"

import axios from 'axios'
import { ChangeEvent, useEffect, useState } from "react"
import { useDropzone } from 'react-dropzone'




export const Form = ()=>{
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 10,
        accept:{
            'image/jpeg': ['.jpg']
        }
    });

    const [selectedFile, setSelectedFile] = useState<File>();
    const [legend, setLegend] = useState('');
    const [progressUpload, setProgressUpload] = useState(0);
    const [photoString, setPhotoString] = useState('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>)=>{
        /* Não importa se foi escolhido só um arquivo, vai vim um array de files e dentro cada índice vem um file */
        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];
            setSelectedFile(file);
        }

    }

    const handleSubmit = async ()=>{
        if(selectedFile){
            setProgressUpload(0);
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('legend', legend)

            const req = await axios.post('https://b7web.com.br/uploadtest/', formData, {
                onUploadProgress:(progressEvent)=>{
                    if(progressEvent.total){
                        const pct = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                        setProgressUpload(pct);
                    }
                }
            })
            console.log(req.data)

            /* const req = await fetch('https://b7web.com.br/uploadtest/', {
                method: 'POST',
                body: formData
            });
            const json = await req.json();
            console.log(json); */
        }
    }


    const handleDropzoneSubmit = async ()=>{
        /* Preview da imagem */
        setPhotoString(URL.createObjectURL(acceptedFiles[0]));
        /* end preview da imagem */
        setProgressUpload(0);
        const formData = new FormData();
        formData.append('legend', legend)
        //formData.append('file', acceptedFiles[0]);
        for(let i in acceptedFiles){
            formData.append(`file[${i}]`, acceptedFiles[i]);
        }

        const req = await axios.post('https://b7web.com.br/uploadtest/', formData, {
            onUploadProgress:(progressEvent)=>{
                if(progressEvent.total){
                    const pct = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                    setProgressUpload(pct);
                }
            }
        })
        console.log(req.data)
    }



    useEffect(()=>{
        console.log(acceptedFiles)
        if(acceptedFiles.length > 0){
            handleDropzoneSubmit();
        }
    }, [acceptedFiles]);

    return (
        <div>
            <div className='bg-gray-400 p-5 h-96' {...getRootProps()}>
                <input {...getInputProps()} />
            </div>
            <div>Arquivos: {acceptedFiles.length}</div>


            <input type="file" className="block my-3" onChange={handleFileChange} />
            <input type="text" className="text-black" value={legend} onChange={e => setLegend(e.target.value)}  />
            <button className="block my-3" onClick={handleSubmit}>Enviar</button>

            <div className="w-[500] h-5 bg-green-100">
                <div className="h-5 bg-green-500" style={{width: progressUpload + '%'}}></div>
            </div>

            <div>
                {progressUpload} de 100%
            </div>

            {photoString &&
                <img src={photoString} className='max-w-80' alt="" />
            }
        </div>
    )
}