import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'providers/auth.provider.js';
import NavAccount from './NavAccount.jsx';
import { Cta } from 'components/Cta/index.jsx';
// import './Navbar.scss';

export default function Navbar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  // align-self: stretch;
  return (
    <div className='flex flex-col justify-between bg-transparent w-[231px] py-[12px]'>
      <div className='flex items-center gap-[12px] pl-[16px] h-[41px] mb-[35px]'>
        <div
          dangerouslySetInnerHTML={{
            __html: `<svg id="514:4121" layer-name="Logomark" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-icon" style="width: 40px; height: 40px"> <g clip-path="url(#clip0_514_4121)"> <path opacity="0.72" d="M40.0882 18.8521C40.0685 18.6525 39.9758 18.4672 39.8277 18.3315C39.6796 18.1957 39.4864 18.119 39.2852 18.1161H19.2733C18.7298 18.1293 18.1993 18.2839 17.7344 18.5646C17.2695 18.8453 16.8864 19.2422 16.6231 19.7161C16.3794 20.1398 16.2512 20.6197 16.2512 21.1081C16.2512 21.5964 16.3794 22.0763 16.6231 22.5001C16.6927 22.6333 16.796 22.7462 16.9227 22.8276C17.0495 22.9089 17.1953 22.956 17.3458 22.9641H39.3334C39.5347 22.9611 39.7278 22.8844 39.8759 22.7487C40.024 22.6129 40.1168 22.4276 40.1365 22.2281C40.1365 21.6041 40.1365 21.0761 40.1365 20.6281C40.1365 20.1801 40.1364 19.4601 40.0882 18.8521Z" fill="#DFE4EA"></path> <path d="M40.0721 18.8521C40.0562 18.6539 39.9669 18.4687 39.8214 18.3327C39.6759 18.1966 39.4847 18.1194 39.2852 18.1161H36.073C35.9603 18.1173 35.8491 18.1422 35.7467 18.1891C35.6443 18.2359 35.5531 18.3037 35.4787 18.3881C35.4038 18.4691 35.3477 18.5656 35.3144 18.6707C35.2811 18.7758 35.2714 18.8868 35.286 18.9961C35.286 19.5081 35.286 20.0201 35.286 20.5961C35.2819 23.1492 34.6324 25.6601 33.3974 27.8972C32.1623 30.1343 30.3813 32.0254 28.2191 33.396C27.9942 33.54 27.7856 33.7161 27.5447 33.8441C26.3661 34.5127 25.1016 35.0187 23.7862 35.3481L25.8903 39.0761C25.9618 39.1993 26.0649 39.3014 26.1891 39.3717C26.3133 39.442 26.4541 39.478 26.5969 39.4761C26.6819 39.4913 26.769 39.4913 26.854 39.4761L27.3678 39.2681L27.8336 39.0761C28.5441 38.7821 29.2361 38.4455 29.9056 38.0681C33.037 36.3108 35.6389 33.7502 37.4408 30.6523C39.2428 27.5545 40.1792 24.0324 40.1525 20.4521C40.1525 19.8601 40.1203 19.3961 40.0721 18.8521Z" fill="#DFE4EA"></path> <path d="M28.7035 34.0388C28.5956 33.8562 28.4241 33.7196 28.2216 33.6548H27.9968C27.8573 33.6559 27.72 33.6887 27.5952 33.7508C25.305 35.049 22.7138 35.7275 20.0788 35.7188C16.0347 35.7103 12.1588 34.1062 9.29918 31.2574C6.43959 28.4087 4.82933 24.5475 4.82084 20.5188C4.82933 16.4901 6.43959 12.6288 9.29918 9.78008C12.1588 6.93136 16.0347 5.32722 20.0788 5.31876C22.7125 5.3196 25.3014 5.99745 27.5952 7.28676C27.7151 7.36258 27.8548 7.40153 27.9968 7.39876H28.1734C28.2835 7.37454 28.3875 7.32794 28.4787 7.26187C28.5699 7.19579 28.6465 7.11166 28.7035 7.01476L30.3096 4.23076C30.4158 4.0456 30.445 3.82639 30.391 3.62006C30.337 3.41372 30.2039 3.23666 30.0205 3.12676C26.9973 1.42487 23.5834 0.531889 20.1109 0.534766C14.789 0.543229 9.68744 2.65308 5.92425 6.40198C2.16106 10.1509 0.0431894 15.233 0.0346947 20.5348C0.0431894 25.8365 2.16106 30.9187 5.92425 34.6676C9.68744 38.4164 14.789 40.5263 20.1109 40.5348C23.5834 40.5376 26.9973 39.6446 30.0205 37.9428C30.1123 37.8914 30.193 37.8222 30.2575 37.7392C30.322 37.6562 30.3691 37.5612 30.3961 37.4597C30.4231 37.3582 30.4294 37.2524 30.4145 37.1485C30.3997 37.0446 30.364 36.9447 30.3096 36.8548L28.7035 34.0388Z" fill="#DFE4EA"></path> <path opacity="0.56" d="M22.3729 22.9H17.2977C17.1538 22.8897 17.0143 22.8451 16.8913 22.7699C16.7683 22.6947 16.6653 22.5912 16.5909 22.468L25.9225 38.932C25.9939 39.0552 26.097 39.1573 26.2213 39.2276C26.3455 39.2979 26.4862 39.3339 26.6291 39.332C26.7194 39.3472 26.8118 39.3472 26.9022 39.332C27.9634 38.9513 28.9898 38.4802 29.9699 37.9239C30.0618 37.8726 30.1422 37.8033 30.2067 37.7204C30.2712 37.6374 30.3184 37.5423 30.3453 37.4409C30.3723 37.3394 30.3786 37.2336 30.3638 37.1297C30.3489 37.0258 30.3132 36.9259 30.2589 36.8359L22.3729 22.9Z" fill="#DFE4EA"></path> </g> <defs> <clipPath id="clip0_514_4121"> <rect width="40.1525" height="40" fill="white" transform="translate(0 0.5)"></rect> </clipPath> </defs> </svg>`,
          }}
        />
        <div className='text-[var(--text-white)] text-[28px] font-semibold'>
          Scriptum
        </div>
      </div>
      <div className='flex flex-col gap-[15px]'>
        <div
          onClick={() => navigate('/')}
          className='flex items-center gap-[10px] py-[18px] px-[40px] text-[var(--text-white)] text-base cursor-pointer'
        >
          <i className='' />
          <div>Home</div>
        </div>
        <button
          onClick={() => navigate('/chat')}
          className='flex items-center gap-[10px] py-[18px] px-[40px] text-[var(--text-white)] text-base cursor-pointer'
        >
          <i className='' />
          <div>Chat</div>
        </button>
        <div className='h-[1px] my-[10px] bg-[rgba(223,228,234,0.43)]' />
        {/* <button
          onClick={() => navigate('')}
          className='flex items-center gap-[10px] py-[18px] px-[40px] text-[var(--text-white)] text-base cursor-pointer'
        >
          <i className='' />
          <div>Settings</div>
        </button> */}
        <button
          onClick={handleLogout}
          className='flex items-center gap-[10px] py-[18px] px-[40px] text-[var(--text-white)] text-base cursor-pointer'
        >
          <i className='' />
          <div>Log out</div>
        </button>
      </div>
      <div className='user-profile'>
        <div
          dangerouslySetInnerHTML={{
            __html: `<svg id="514:4145" layer-name="User" width="231" height="58" viewBox="0 0 231 58" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="user-avatar" style="width: 100%; height: 58px"> <rect width="231" height="58" rx="29" fill="white" fill-opacity="0.15"></rect> <circle cx="29" cy="29" r="25" fill="url(#pattern0_514_4145)"></circle> <text fill="#DFE4EA" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="18" font-weight="bold" letter-spacing="0px"><tspan x="82.6855" y="35.5455">Devid Wilium</tspan></text> </svg>`,
          }}
        />
      </div>
    </div>
  );
}
