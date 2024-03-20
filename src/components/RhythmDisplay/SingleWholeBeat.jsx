import Image from 'next/image'

export default function SingleWholeBeat({note, id}) {
  const {imagePath, name} = note
  return (
    <Image 
      id={id}
      className={`w-full h-full`}
      src={imagePath} 
      alt={name} 
      width={250} 
      height={300}
    />
  )
}



