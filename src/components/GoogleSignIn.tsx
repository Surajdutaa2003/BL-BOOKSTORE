import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function GoogleSignIn() {
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse: CredentialResponse): void => {
        localStorage.setItem("token", JSON.stringify({
            token: credentialResponse.credential,
            name: "User"
        }));

        toast.success("Login Successfull 🎉");
        navigate('/');
        console.log("Google Sign In Success: ", credentialResponse);
    }

    const handleError = () => {
        console.log("Google Sign In Error")
    }

    return (
        <GoogleOAuthProvider clientId='848179557462-n48vdd3lb42ql9agb0k2fa9bnm90vmtg.apps.googleusercontent.com'>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="filled_blue"
                size="large"
                width="200"
            />
        </GoogleOAuthProvider>
    )
}

export default GoogleSignIn

