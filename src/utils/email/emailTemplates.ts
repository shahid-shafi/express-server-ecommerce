import Mailgen, { Content } from 'mailgen';


export const activateAccountEmail = async (email: string) => {

}

export const sendOTPEmail = async (email: string, otp: string | number) => {
    try {
        const template = generateTemplate(email);

    } catch (error: any) {
        console.log('Error from sendOTPEmail: ', error);
        throw new Error(error);
    }
};

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Your product or app name
        name: 'ShopIT',
        link: 'https://youtube.com/',
        // Your product logo URL
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/2560px-Logo_of_YouTube_%282015-2017%29.svg.png',
    },
});

export const generateTemplate = (email: string) => {
    const template: Content = {
        body: {
            name: 'Max',
            intro: 'You have requested to reset your password!',
            action: [
                {
                    instructions: 'Choose an option below to proceed:',
                    button: {
                        text: 'Login as Max',
                        link: `https://yourapp.com/login?token=`,
                    },
                },
                {
                    instructions: '',
                    button: {
                        text: 'Change Password',
                        link: `https://yourapp.com/change-password?token=`,
                    },
                },
            ],
            outro:
                'If you did not request a password reset, please ignore this email.',
        },
    };
    return mailGenerator.generate(template);
};

const generateActivationTemplate = (name: string) => {
    const template: Content = {
        body: {
            name: `Hi ${name}`,
            intro: 'Welcome to ShopIt! We\'re very excited to have you on board.',
            action: {
                instructions: 'To activate you account, please click here:',
                button: {
                    color: '#4a86f7',
                    text: 'Activate your account',
                    link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        },
    };
    return mailGenerator.generate(template);
}
