import React, {Fragment, useContext} from 'react'
import Header from '../components/PermanentLayout/Header'
import AuthContext from '../store/authContext'

const ProfileScreen = ({openModal}) => {
    const authCtx = useContext(AuthContext)
    let name = authCtx.firstName

    return (
        <Fragment>
            <Header openModal={openModal} />
            <section className='relative top-20'>
                <div className='flex flex-col justify-center items-center gap-8 h-48'>
                    <p className='text-3xl font-medium'>Welcome, {name}</p>
                    <button className='bg-red rounded-3xl text-white font-semibold w-48 h-10'>Add My Adventure</button> 

                </div>

            </section>
        </Fragment>
    )
}

export default ProfileScreen