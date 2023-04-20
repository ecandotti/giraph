import React from 'react'
import bg from '@assets/images/bg.jpg'
import Button from '@components/Button/Button'
import mac from '@assets/images/mac.png'
import salah from '@assets/images/salah.jpg'
import { useNavigate } from 'react-router-dom'
import { ROUTER_URLS } from '@services/routers/urls'

const Home: React.FC = () => {
    const navigate = useNavigate()
    return (
        <>
            <section className="relative h-screen">
                <img src={bg} alt="" className="w-full h-full object-cover filter brightness-50" />
                <div className="absolute left-5 right-5 sm:left-10 bottom-10 sm:w-1/2 text-white">
                    <h1 className="font-bold text-5xl sm:text-7xl mb-10">Application web de ticket</h1>
                    <p className="mb-10">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe voluptate sint veritatis nam expedita quam
                        iusto ipsa, asperiores aperiam cum autem, suscipit rerum eius esse omnis aut consequatur sequi voluptates!
                    </p>
                    <Button title="S'inscrire" onClick={() => navigate(ROUTER_URLS.REGISTER)} />
                </div>
            </section>
            <section></section>
            <section className="bg-slate-200 py-20">
                <div className="mx-auto container flex flex-col px-4 sm:px-0 sm:flex-row justify-between items-center gap-10 mb-20">
                    <div className="flex-1 flex justify-center h-full">
                        <img src={mac} className="h-auto max-w-lg" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl mb-10">Designed for Startups</h2>
                        <p className="mb-10">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, unde eos cumque ipsum et iste
                            explicabo deserunt excepturi impedit id tenetur praesentium assumenda! Vitae doloremque ea assumenda
                            explicabo, numquam blanditiis.
                        </p>
                        <ul className="flex flex-col gap-4 mb-10 list-disc pl-5">
                            <li>Avantage 1</li>
                            <li>Avantage 2</li>
                            <li>Avantage 3</li>
                        </ul>
                        <Button title="S'inscrire" onClick={() => navigate(ROUTER_URLS.REGISTER)} />
                    </div>
                </div>
                <div className="mx-auto container flex flex-col px-4 sm:px-0 sm:flex-row-reverse justify-between items-center gap-10 mt-20">
                    <div className="flex-1 flex justify-center h-full">
                        <img src={mac} className="h-auto max-w-lg" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl mb-10">Designed for Startups</h2>
                        <p className="mb-10">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, unde eos cumque ipsum et iste
                            explicabo deserunt excepturi impedit id tenetur praesentium assumenda! Vitae doloremque ea assumenda
                            explicabo, numquam blanditiis.
                        </p>
                        <ul className="flex flex-col gap-4 mb-10 list-disc pl-5">
                            <li>Avantage 1</li>
                            <li>Avantage 2</li>
                            <li>Avantage 3</li>
                        </ul>
                        <Button title="S'inscrire" onClick={() => navigate(ROUTER_URLS.REGISTER)} />
                    </div>
                </div>
            </section>
            <section className="mx-auto container px-4 sm:px-0 py-10">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center mb-5">
                        <img src={salah} alt="" className="rounded-full w-14 h-14 object-cover" />
                        <div className="flex flex-col ml-5">
                            <span className="text-slate-800">Salah. Doe</span>
                            <span className="text-slate-500 text-xs">Co-Founder Facturation</span>
                        </div>
                    </div>
                    <p className="text-center max-w-sm">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur accusantium unde esse consectetur
                    </p>
                </div>
            </section>
        </>
    )
}

export default Home
