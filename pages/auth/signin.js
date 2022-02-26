import {getProviders, signIn as SignIntoProvider} from 'next-auth/react'

//client
function signin({providers}) {
    return (
        <>
        <div className="flex flex-col items-center justify-center text-center
        py-2 pt-10 px-14">
        <p className='italic font-xs'>Made by harry :)</p>

        <div className="mt-40">
            {Object.values(providers).map((provider)=>(
                <div className='' key={provider.name}>
                    <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={()=> SignIntoProvider(provider.id,{callbackUrl:'/tableindex'})}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
            </div>
        </div>


        </>
    )
}


//Server
export async function getServerSideProps(){
    const providers = await getProviders()

    return {
        props:{
            providers
        }
    }
}

export default signin
