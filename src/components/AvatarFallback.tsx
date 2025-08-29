// import { Avatar } from "@mantine/core";

// const AvatarFallback = ({
//   imageUrl,
//   name
// })=>{

//   return (

//     <>
//     {
//       imageUrl ?    <Avatar src={imageUrl} alt="User Avatar" />
//                    :  <Avatar color="cyan" radius="xl">{
//                       name?.split(" ")?.map(n=>n.charAt(0).toUpperCase()) || 'Unknown Company'
//                    }</Avatar>
//     }
//     </>
  
//   )
// }

// export default AvatarFallback;

import { Avatar } from "@mantine/core";

interface AvatarFallbackProps {
  imageUrl?: string | null;
  name?: string;
}

const AvatarFallback = ({ imageUrl, name }: AvatarFallbackProps) => {
  // Generate initials safely
  const initials =
    name?.trim()
      .split(/\s+/)
      .map((n) => n[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2) || "NA";

  return (
    <Avatar src={imageUrl || undefined} alt={name || "User Avatar"} radius="xl" color="cyan">
      {!imageUrl && initials}
    </Avatar>
  );
};

export default AvatarFallback;
