/*global chrome*/
import { useState, useEffect } from 'react';
import { Flex, Text, Alert, AlertIcon, AlertDescription, Spinner, Button } from '@chakra-ui/react';
import supabaseClient from '../utils/supabaseClient';
import { auth } from '../utils/firebase-init';
import { goTo } from 'react-chrome-extension-router';
import { EmailAuthProvider, linkWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import MainPage from './MainPage';
import PricingPage from './PricingPage';
import { useGlobalContext } from '../context/GlobalContext';

const configState = {
  name: '',
  apiKey: '',
  prompt: 'write a reply message: ',
  model: "text-davinci-003",
  temperature: 0.7,
  maxTokens: 1024,
};

var userid;

function AuthPage() {
  const [btnTxt, setBtnTxt] = useState("Sign up");
  const [headerTxt, setheaderTxt] = useState("Create your account");
  const [footerTxt, setfooterTxt] = useState("Already have an account?");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorMargin, seterrorMargin] = useState("mt-2");
  const [btnLoading, setBtnLoading] = useState(false);

  const { user, userDet, setStatus, setBack } = useGlobalContext();

  useEffect(()  => {
    setBack(true);
    setStatus('signup');
  }, [])

  useEffect(()  => {
    if((user.email && userDet.status === null)) { 
      goTo(PricingPage);
    }else if(user.email && userDet.status !== null) {
      goTo(MainPage);
    }
  }, [])

  const setError = (msg) => {
    setErrorMsg(msg);
    seterrorMargin('mt-3');
    setBtnLoading(false);
  }
  const setErrorReset = () => {
    setErrorMsg(null);
    seterrorMargin('mt-2');
  }

  const updateName = async (userid) => {
    const { data, error } = await supabaseClient
    .from('users')
    .update({ name: name })
    .eq('id', userid)
    .select();

    return { data, error }
  }

  const toggleAuth = () => { 
    if(btnTxt === "Sign up") {
        setBtnTxt("Sign in");
        setheaderTxt("Sign in to your account");
        setfooterTxt("Don't have an account?");
    }else {
        setBtnTxt("Sign up");
        setheaderTxt("Create your account");
        setfooterTxt("Already have an account?");
    }
    setErrorReset();
  }

  const signUp = async () => { 
    const credential = EmailAuthProvider.credential(email, password);
    console.log("Linking")
    linkWithCredential(auth.currentUser, credential)
    .then((usercred) => {
        const user = usercred.user;
        console.log(user);
        updateName(user.uid).then(({ data, error }) => {
          if(error) {
            setError("There was an error creating an account. Please try again after sometime");
          }
          if(data) {
            console.log("Account successfully Created", user);
            setBtnLoading(false);
            goTo(PricingPage);
          }
        })
    }).catch((error) => {
      console.log(error);
        if(error.code === "auth/provider-already-linked" || error.code === "auth/email-already-in-use") { 
            setError("Email already in use");
        }else {
            setError("There was an error. Please try again after sometime");
        }
    });
  }

  const signIn = async () => { 
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setBtnLoading(false);
        setStatus('');
        setBack(false);
        goTo(MainPage);
    })
    .catch((error) => {
        console.log(error);
        if(error.code === 'auth/wrong-password') {
          setError("The Password entered was incorrect!!");
        }else if(error.code === 'auth/user-not-found') {
          setError("No user with this record");
        }else {
          setError("There was an error. Please try again after sometime");
        }
    });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if(email === "" || password === "") {
        setError("Please fill in all fields");
    }else if(password.length < 6) { 
        setError("Password must be at least 6 characters");
    }else if(btnTxt === 'Sign up' && name === "") { 
      setError("Please fill your name");
    }else if(btnTxt === 'Sign up' && !name.match(/^([A-Za-z ]){3,20}$/)) { 
      setError("Name entered is invalid");
    }else {
        setBtnLoading(true);
        btnTxt === "Sign up" ? signUp() : signIn();
    }    
  }

  return (
    <Flex direction="column" flex={1} justifyContent={"space-between"} gap="2">
      <div className={`${errorMargin} flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8`}>
        <div className="w-full max-w-md space-y-8 -mt-5">
          <Flex direction={'column'} textAlign={'center'}>
            <h2 className="mt-6 text-center text-[25px] font-semibold text-gray-900">
              {headerTxt}
            </h2>
            <Text fontSize={'xs'} color={'gray.400'}>
              And lets get started with your free trial
            </Text>
          </Flex>
          <form className={`space-y-6`}>
            <div className=" rounded-md shadow-sm">
             {errorMsg && ( 
                <Alert status="error" className='-mt-3 mb-7' px={3} borderRadius={10}>
                    <AlertIcon  />
                    <AlertDescription className='text-sm'>{errorMsg}</AlertDescription>
                </Alert>
             )}
              <Flex direction={'column'} mt={-3} gap={1} px={3}>
                {
                  btnTxt === "Sign up" && <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                }
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div>
                    <label for="email" className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label for="password" className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
              </Flex>
            </div>

            <div>
              <Button
                colorScheme='indigo-600'
                isLoading={btnLoading}
                disabled={btnLoading}
                onClick={(e) => handleSubmit(e)}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {btnTxt}
              </Button>
            </div>

            <Flex direction={"row"} justifyContent={'center'} pb={10} gap={2}>
                <div className="text-sm">
                    {footerTxt}
                </div>
                <div className="text-sm">
                    <p onClick={toggleAuth} className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                        Click here
                    </p>
                </div>
            </Flex>
          </form>
        </div>
      </div>
    </Flex>
  );
}

export default AuthPage;
