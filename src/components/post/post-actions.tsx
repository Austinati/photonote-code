import { manageLike, manageSaved } from "@/lib/firebase/utils";
import { CustomIcon } from "../ui/custom-icon";
import type { Post } from "@/lib/types/post";
import { useAuth } from "@/lib/context/auth-context";

type PostActionsProps = Post & {
    openPostModal?: () => void;
};

export function PostActions(post: PostActionsProps) : JSX.Element
{

    const { user, userSaved } = useAuth();

    const postIsLiked = post.userLikes.includes(user ? user.id : "1");
    const postIsSaved = !!userSaved?.some(({ id }) => id === post.id);

    const handleSaved = async () : Promise<void> => {
        if(user)
        {
            await manageSaved(postIsSaved ? 'unsave' : 'save', user.id, post.id);
        }
    }
    
    return ( 
        <>
            <button
                className="flex flex-row items-center gap-x-3"
                onClick={manageLike(
                    postIsLiked ? "unlike" : "like",
                    user ? user.id : "1",
                    post.id
                )}
            >
                <CustomIcon className={postIsLiked ? "text-red-600 w-6 h-6" : "dark:text-white text-black w-6 h-6"} iconName={postIsLiked ? "SolidHeartIcon" : "HeartIcon"}  />
                {post.userLikes.length > 0 && <p className="font-bold">{post.userLikes.length}</p>}
            </button>
            <button className="w-6 h-6" onClick={post.openPostModal}>
                <CustomIcon iconName="MessageIcon" />
            </button>
            <button className="w-6 h-6">
                <CustomIcon iconName="SendToIcon" />
            </button>
            <button className="w-6 h-6 ml-auto" onClick={handleSaved}>
                <CustomIcon iconName={postIsSaved ? "SolidSaveIcon" : "SaveIcon"}/>
            </button>
        </>
    );
}