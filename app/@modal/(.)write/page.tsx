import { createPost } from "@/app/write/write-post.action";
import { WriteModal } from "./WriteModal";
import { getUser } from "@/src/theme/query/user.query";



export default async function Page() {
  const user = await getUser();
  return(
    <div>
      <WriteModal user={user} createPost={createPost} />
    </div>
  )
}