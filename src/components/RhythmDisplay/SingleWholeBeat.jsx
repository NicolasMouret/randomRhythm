import Image from 'next/image'

export default function SingleWholeBeat({note, id}) {
  const {imagePath, name} = note
  return (
    <Image 
      id={id}
      className={``}
      src={imagePath} 
      alt={name} 
      width={250} 
      height={300} 
      style={{ 
      minHeight: "250px",
      maxHeight: "300px",}}
    />
  )
}



