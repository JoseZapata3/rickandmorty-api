import Image from "next/image";
import Link from "next/link"

export const metadata = {
  title: 'Rick and Morty API Test',
  description: 'This is a blog showcasing the first 20 characters from the Rick and Morty series',
  keywords: ['Api','Rickandmorty','showcasing']
}


export default async function Home() {
  const characters = await getCharacters()
  return (
    <>
      <ul>
        {
          characters.results.map(({id, name, image})=>(
            <li key={id}>
              <Image src={image} width={100} height={100} alt={`${name} Image`}/>
              <Link href={`character/${id}`}><h3>{id}-{name}</h3></Link>
            </li>
          ))
        }
      </ul>
    </>
  );
}

async function getCharacters(){

  try{
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=1`)
      if(!res.ok){
          throw new Error('There wat an error on the network')
      }else{
          const characters = res.json()
          return characters
      }
  }catch(err){
      console.error(err)
      return null
  }
}