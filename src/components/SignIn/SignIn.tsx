import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useSigninCheck } from 'reactfire';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {
    getAuth,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'
import {
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Input2 } from '../sharedComponents';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form'

const signinStyles = {
    googleButton: {
        backgroundColor: 'rgb(66, 133, 244)',
        margin: '2em',
        padding: 0,
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rbg(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo: {
        width: '48px',
        height: '48px',
        display: 'block'
    },

    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-serif',
        textAlign: 'center',
        fontSize: '2em'
    },

    containerStyle: {
        marginTop: '2em'
    },

    snackBar: {
        color: 'white',
        backgroundColor: '#4caf50'
    }  //Styled Link for Nav

}
const NavA = styled(Link)({
    display: 'block',
    color: 'black',
    fontFamily: 'sans-serif',
    marginBottom: '20px'

})

// Functional component to be used inside of SignIn Component
const Alert = (props: AlertProps) => {
    return <MUIAlert elevation={6} variant="filled" />
}

interface buttonProps {
    open?: boolean
    onClick?: () => void
}

//Functional Component to conditionally render Google Sign Button

const GoogleButton = (props: buttonProps) => {
    const navigate = useNavigate();
    // const provider = new GoogleAuthProvider(); //<-- dont forget parentheses
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

    const signIn = async () => {
        await signInWithGoogle()
        console.log(user)
        console.log(auth)
        if (auth.currentUser) {
            // storing authenticated user in a local variable
            localStorage.setItem('myAuth', 'true')
            // navigate to dashboard after successful signin
            navigate('/dashboard')
        }
        else {
            console.log('Boooo')
            navigate('/signin')
        }
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email)
            console.log(user.uid)
        }
    })

    const signUsOut = async () => {
        await signOut(auth)
        //Setting our locastorage to false for signout user
        localStorage.setItem('myAuth', 'false')
        navigate('/signin')
    }

    if (loading) {
        return <CircularProgress />
		}
		
		
		
		const MyAuth = localStorage.getItem('myAuth')
    console.log(MyAuth)
		if (MyAuth == 'true') {    
		  return (
		      <Button variant="contained" color='secondary' onClick={signUsOut}>Sign Out</Button>
		  )
		} else {
		  return (
		      <Button sx={signinStyles.googleButton} onClick={signIn}>Sign In With Google</Button>
		  )
		}

}

interface userProps {
    email?: void | string
    password?: void | string
}

export const SignIn = (props: userProps) => {
    const [open, setOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm({})
    const auth = getAuth()

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClose = () => {
        setOpen(false)
        setAlertOpen(true)

    }

    const navToClose = () => {
        navigate('/dashboard')
    }


    // onSubmit to grab user information from the form
    const onSubmit = async (data: any, event: any) => {
        console.log(data.email, data.password)

        //Add option to sign in with a form
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                //Sign In
                //Store authenticated user in localStorage variable
                localStorage.setItem('myAuth', 'true')
                const user = userCredential.user;
                navigate('/dashboard')
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.message)
            });

    }

    return (
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign in Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Place Email Here' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <Input2 {...register('password')} name='password' placeholder='Place Password Here' />
                </div>
                <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </form>
            <NavA to="/signup">Dont't Have an account? Register Now!</NavA>
            <GoogleButton open={open} onClick={handleSnackClose} />
            <Snackbar message='success' open={alertOpen} autoHideDuration={3000}  onClose={navToClose}>
                <div>
                    <Alert severity='success'>
                        <AlertTitle>Successful Sign In --- Redirect in 3 seconds</AlertTitle>
                    </Alert>
                </div>
            </Snackbar>
        </Container>
    )
}

export const SignUp = (props: userProps) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm({})
    const auth = getAuth()

    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClose = () => {
        navigate('/signin')
    }

    // onSubmit to grab user information from the form
    const onSubmit = async (data: any, event: any) => {
        console.log(data.email, data.password)

        //Add option to sign in with a form
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                //Sign In
                //Store authenticated user in localStorage variable

                const user = userCredential.user;
                console.log(user)
                navigate('/signin')
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });

    }

    return (
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign Up Below
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input {...register('email')} name='email' placeholder='Place Email Here' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <Input2 {...register('password')} name='password' placeholder='Place Password Here' />
                </div>
                <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </form>
            <Snackbar message='success' open={open} autoHideDuration={3000} onClose={handleSnackClose}>
                <Alert severity='success'>
                    <AlertTitle>Successful Sign Up --- Redirect in 3 seconds</AlertTitle>
                </Alert>
            </Snackbar>
        </Container>
    )
}

