// import Image from "next/image"


const UserProfile = (props: any) => {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                {/* <Image 
                    className="w-8 h-8 rounded-full"
                    src={testImage}
                    width="40"
                    height="40"
                    alt=""/> */}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Neil Sims
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                </p>
            </div>
        </div>
    )
}

export default UserProfile