import { notFound } from "next/navigation";

export async function generateStaticParams(){
    const characters = await fetch('https://rickandmortyapi.com/api/character?page=1').then( (res) => res.json())
    return characters.results.map((character)=>{
        {
            id: String(character.id)
        }
    })
    
}

export default async function Page({params}){
    const character = await getCharacters(params.id)
    if(!character){
        notFound()
    }else{
        return(
            <>
                <h1>{character.name}</h1>
            </>
        )
        
    }
}

async function getCharacters(id){
    try{
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        if(!res.ok){
            throw new Error('There wat an error on the network')
        }else{
            const character = res.json()
            return character
        }
    }catch(err){
        console.error(err)
        return null
    }
}