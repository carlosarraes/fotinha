import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Login from './login'
import Checkout from './checkout'
import { api } from '@/utils/api'
import { Button } from './ui/button'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/router'

const Main = () => {
  const { status } = useSession()
  const router = useRouter()

  const { data: user } = api.user.fetchUser.useQuery()

  const paidUser = user?.isPaymentSucceeded && status === 'authenticated'
  const freeUser = !user?.isPaymentSucceeded && status === 'authenticated'
  const guestUser = status === 'unauthenticated'

  return (
    <section className="flex flex-col justify-center items-start text-center md:text-left p-4 border-x border-b h-screen border-slate-800">
      <h1 className="text-3xl mx-auto font-bold text-sky-600 dark:text-sky-600 mb-4">
        Desbloqueie um mundo de criatividade ilimitada!
      </h1>
      <div className="flex w-full justify-center items-center space-x-4">
        <div className="w-1/3 rounded overflow-hidden shadow-gray-500 shadow-md">
          <Image
            src="/pic3.png"
            alt="Picture generated by pollinations.ai"
            width={400}
            height={400}
          />
        </div>
        <div className="w-1/2 self-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            Treine um modelo com suas próprias fotos!
          </h2>
          <p className="text-lg text-black dark:text-gray-300 mb-4">
            Por apenas <span className="font-bold text-sky-500">R$ 7,90</span>, treine um modelo com
            suas próprias fotos.
          </p>
          <p className="text-lg text-black dark:text-gray-300">
            Descubra a magia de criar 10 imagens únicas e personalizadas. Faça parte da revolução
            tecnológica hoje!
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <div className="w-1/2 self-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
            Teste criar imagens a partir de textos!
          </h2>
          <p className="text-lg text-black dark:text-gray-300 mb-4">
            Compre créditos para testar o modelo de texto por apenas{' '}
            <span className="text-sky-500 font-bold">R$ 4,90</span> (50 créditos).
          </p>
          <p className="text-lg text-black dark:text-gray-300">
            Utilize sua criatividade para criar imagens a partir de textos. Faça parte da revolução!
          </p>
        </div>
        <div className="w-1/3 rounded overflow-hidden shadow-gray-500 shadow-md">
          <Image src="/pic2.png" alt="Picture generated by anything" width={400} height={400} />
        </div>
      </div>
      <section className="flex border p-2 w-4/5 mx-auto mt-6 hover:bg-sky-100 dark:hover:bg-gray-800 duration-200 rounded group self-center">
        {paidUser && (
          <Button
            className="mx-auto group cursor-pointer"
            onClick={() => void router.push('/dashboard')}
          >
            Dashboard
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition" />
          </Button>
        )}
        {freeUser && <Checkout />}
        {guestUser && <Login />}
      </section>
    </section>
  )
}

export default Main
