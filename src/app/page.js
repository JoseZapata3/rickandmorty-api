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
      <main>
        <section className="cards-container">
          {
            characters.results.map(({id, name, status, image, species})=>(
              <div key={id} className='card-container'>         
                  <Link href={`character/${id}`}>
                    <div className="card">
                      <Image src={image} width={200} height={200} alt={`${name} Image`}/>
                      <div className="character-description">
                        <p>Name: {name}</p>
                        <p>Status: <span style={{color:status=='Alive'?'#23de23':'#ee3737'}}>{status}</span></p>
                        <p>Species: {species}</p>
                      </div>
                    </div>
                  </Link>
              </div>
            ))
          }
        </section>
      </main>
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