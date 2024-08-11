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
      <div className="banner">
        <div className="slider" style={{"--quantity":20}}>
          {
            characters.results.map(({id, name, status, image, species},index)=>(
              <div key={id} className='item' style={{"--position":index+1}}>
                  <div className="card">
                    <Link href={`character/${id}`}>
                        <Image className="character-img" src={image} width={200} height={200} alt={`${name} Image`} priority/>
                        <div className="character-description">
                          <p>Name: {name}</p>
                          <p>Status: <span style={{color:status=='Alive'?'#23de23':'#ee3737'}}>{status}</span></p>
                          <p>Species: {species}</p>
                        </div>
                    </Link>
                  </div>     
              </div>
            ))
          }
        </div>
        <div className="content">
            <h1>Rick and Morty Test API Test</h1>
            <div className="author">
              <h2>Jose Alejandro Zapata</h2>
            </div>
            <div className="model"></div>
        </div>
      </div>
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