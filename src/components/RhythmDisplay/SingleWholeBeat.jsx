import Image from 'next/image'

export default function SingleWholeBeat({note, id}) {
  const {imagePath, name} = note
  return (
    <Image 
      id={id}
      className={``}
      src={imagePath} 
      alt={name} 
      width={350} 
      height={300} 
      style={{width: "20%", 
      minHeight: "250px",
      maxHeight: "300px",}}
    />
  )
}



