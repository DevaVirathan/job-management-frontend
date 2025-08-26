import { Avatar } from "@mantine/core";

const AvatarFallback = ({
  imageUrl,
  name
})=>{

  return (

    <>
    {
      imageUrl ?    <Avatar src={imageUrl} alt="User Avatar" />
                   :  <Avatar color="cyan" radius="xl">{
                      name?.split(" ")?.map(n=>n.charAt(0).toUpperCase()) || 'Unknown Company'
                   }</Avatar>
    }
    </>
  
  )
}

export default AvatarFallback;