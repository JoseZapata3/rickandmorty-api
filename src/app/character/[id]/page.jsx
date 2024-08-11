import { notFound } from "next/navigation";
import Image from "next/image";

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
                <div className="personal-card">
                    <div className="card">
                        <Image className="personal-img" src={character.image} width={400} height={400} alt={`${character.name} Image`}/>
                        <div className="character-description">
                            <p>Name: {character.name}</p>
                            <p>Status: <span style={{color:character.status=='Alive'?'#23de23':'#ee3737'}}>{character.status}</span></p>
                            <p>Species: {character.species}</p>
                        </div>
                    </div>
                </div>
                
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