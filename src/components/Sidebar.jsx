import { useState } from "react";
import enagramLogo from "/ძირითადი-ლოგო-ai 1.png";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      id: "spell",
      icon: <SpellcheckIcon />,
      activeIcon: <SpellcheckIcon active />,
      label: "მართლმწერი",
    },
    {
      id: "compare",
      icon: <CompareIcon />,
      activeIcon: <CompareIcon active />,
      label: "ტექსტის შედარება",
      active: true,
    },
    {
      id: "voice-to-text",
      icon: <MicIcon />,
      label: (
        <>
          ხმა <ArrowOnSideBar /> ტექსტი
        </>
      ),
    },
    {
      id: "text-to-voice",
      icon: <WaveIcon />,
      label: (
        <>
          ტექსტი <ArrowOnSideBar /> ხმა
        </>
      ),
    },
    {
      id: "pdf",
      icon: <DocIcon />,
      label: "PDF კონვერტაცია",
    },
  ];

  const sidebarNav = (isOverlay) => (
    <div className="flex flex-col h-full relative overflow-visible">
      {!isOverlay && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-3 right-6.75 z-10 text-white/50 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <svg
            className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.16667 14.1666L5 9.99992L9.16667 5.83325"
              stroke="white"
              strokeOpacity="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 14.1666L10.8334 9.99992L15 5.83325"
              stroke="white"
              strokeOpacity="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className="flex items-center gap-[11px] pl-6 pt-11.25 pb-8">
        <div
          className={`shrink-0 overflow-hidden ${collapsed && !isOverlay ? "w-8 h-8" : ""}`}
          style={collapsed && !isOverlay ? {} : { width: '42.65px', height: '44px' }}
        >
          <img
            src={enagramLogo}
            alt="Enagram"
            className="w-full h-auto"
          />
        </div>
        {(!collapsed || isOverlay) && (
          <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">
            ENAGRAM
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-7 overflow-visible pt-4.75">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => e.preventDefault()}
            className={`flex items-center gap-2.25 text-sm transition-colors relative
              ${
                item.active
                  ? "bg-white text-[#132450] font-bold rounded-tl-[30px] rounded-bl-[30px] rounded-r-none ml-[12.8px] -mr-1 pl-[11.2px] pr-4 h-13 z-10"
                  : "text-white hover:bg-[#2F4273] rounded-lg mx-3 px-3 h-13"
              }
              ${collapsed && !isOverlay ? "justify-center mx-2 px-2 w-auto" : ""}`}
          >
            {/* Inverse border-radius notches for active tab effect */}
            {item.active && (
              <>
                <div
                  className="absolute right-0.5 w-4 h-2.5"
                  style={{
                    bottom: 'calc(100% - 1px)',
                    background: 'radial-gradient(15px 10px at 0 0, transparent 98%, white 102%)',
                  }}
                />
                <div
                  className="absolute right-0.5 w-4 h-2.5"
                  style={{
                    top: 'calc(100% - 1px)',
                    background: 'radial-gradient(15px 10px at 0 100%, transparent 98%, white 102%)',
                  }}
                />
              </>
            )}
            <span className="w-6 h-6 shrink-0 flex items-center justify-center">
              {item.active ? item.activeIcon || item.icon : item.icon}
            </span>
            {(isOverlay || !collapsed) && (
              <span className="truncate">{item.label}</span>
            )}
          </a>
        ))}
      </nav>

      <div className="border-t border-[rgba(158,185,255,0.2)] mx-4 pt-4 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#9EC8FF] border border-white flex items-center justify-center shrink-0">
            <span className="text-[#132450] text-[7px] font-bold leading-none">
              თო
            </span>
          </div>
          {(isOverlay || !collapsed) && (
            <>
              <span className="text-white text-sm truncate flex-1">
                თამარ ონიანი
              </span>
              <svg
                className="w-6 h-6 text-white/60 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="6" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="18" cy="12" r="1.5" />
              </svg>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#132450] flex items-center justify-between px-4 h-12">
        <div className="flex items-center gap-2">
          <img
            src={enagramLogo}
            alt="Enagram"
            className="w-7 h-7 shrink-0 object-contain"
          />
          <span className="text-white font-bold text-sm tracking-[0.15em] uppercase">
            ENAGRAM
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-white p-1 cursor-pointer"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="lg:hidden fixed top-12 left-0 right-0 z-30 bg-white px-4 py-2.5 flex items-center gap-2 border-b border-[#EDEDED]">
        <span className="w-6 h-6 flex items-center justify-center">
          <CompareIcon active />
        </span>
        <span className="text-[#132450] font-bold text-sm font-sans">
          ტექსტის შედარება
        </span>
        <svg
          className="w-4 h-4 text-[#383A48]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-60 h-full bg-[#132450] flex flex-col shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 z-10 w-6 h-6 text-white/60 hover:text-white cursor-pointer"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {sidebarNav(true)}
          </aside>
        </div>
      )}

      <aside
        className={`hidden lg:flex flex-col shrink-0 bg-[#132450] h-screen sticky top-0 transition-all duration-200 overflow-visible z-10 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {sidebarNav(false)}
      </aside>
    </>
  );
}

function SpellcheckIcon({ active = false }) {
  const stroke = active ? "#132450" : "white";
  const fill = active ? "#132450" : "white";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 8L10 19L5 14"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.99077 9H1.14702L2.68324 4.63636H3.65909L5.19744 9H4.35369L3.18821 5.53125H3.15412L1.99077 9ZM2.01847 7.28906H4.3196V7.92401H2.01847V7.28906ZM5.77219 9V4.63636H7.44265C7.75799 4.63636 8.02006 4.68608 8.22887 4.78551C8.4391 4.88352 8.59606 5.01776 8.69975 5.18821C8.80487 5.35866 8.85742 5.55185 8.85742 5.76776C8.85742 5.94531 8.82333 6.0973 8.75515 6.22372C8.68697 6.34872 8.59535 6.45028 8.48029 6.52841C8.36523 6.60653 8.23668 6.66264 8.09464 6.69673V6.73935C8.24947 6.74787 8.3979 6.79545 8.53995 6.8821C8.68342 6.96733 8.8006 7.08807 8.89151 7.24432C8.98242 7.40057 9.02788 7.58949 9.02788 7.81108C9.02788 8.03693 8.97319 8.24006 8.86381 8.42045C8.75444 8.59943 8.58967 8.74077 8.3695 8.84446C8.14933 8.94815 7.87234 9 7.53853 9H5.77219ZM6.56268 8.33949H7.41282C7.69975 8.33949 7.90643 8.2848 8.03285 8.17543C8.16069 8.06463 8.22461 7.92259 8.22461 7.74929C8.22461 7.62003 8.19265 7.50355 8.12873 7.39986C8.06481 7.29474 7.9739 7.21236 7.856 7.1527C7.7381 7.09162 7.59748 7.06108 7.43413 7.06108H6.56268V8.33949ZM6.56268 6.49219H7.34464C7.481 6.49219 7.60387 6.46733 7.71325 6.41761C7.82262 6.36648 7.90856 6.29474 7.97106 6.20241C8.03498 6.10866 8.06694 5.99787 8.06694 5.87003C8.06694 5.70099 8.00728 5.56179 7.88796 5.45241C7.77006 5.34304 7.59464 5.28835 7.36168 5.28835H6.56268V6.49219ZM13.4506 6.10866H12.6538C12.631 5.97798 12.5891 5.86222 12.5281 5.76136C12.467 5.65909 12.391 5.57244 12.3001 5.50142C12.2092 5.4304 12.1055 5.37713 11.989 5.34162C11.8739 5.30469 11.7496 5.28622 11.6161 5.28622C11.3789 5.28622 11.1687 5.34588 10.9854 5.4652C10.8022 5.5831 10.6587 5.75639 10.555 5.98509C10.4513 6.21236 10.3995 6.49006 10.3995 6.81818C10.3995 7.15199 10.4513 7.43324 10.555 7.66193C10.6602 7.8892 10.8036 8.06108 10.9854 8.17756C11.1687 8.29261 11.3782 8.35014 11.614 8.35014C11.7447 8.35014 11.8668 8.3331 11.9805 8.29901C12.0955 8.26349 12.1985 8.21165 12.2894 8.14347C12.3817 8.07528 12.4592 7.99148 12.5217 7.89205C12.5856 7.79261 12.6296 7.67898 12.6538 7.55114L13.4506 7.5554C13.4208 7.76278 13.3562 7.95739 13.2567 8.1392C13.1587 8.32102 13.0302 8.48153 12.8711 8.62074C12.712 8.75852 12.5259 8.86648 12.3129 8.9446C12.0998 9.02131 11.8633 9.05966 11.6033 9.05966C11.2198 9.05966 10.8775 8.97088 10.5763 8.79332C10.2752 8.61577 10.038 8.35938 9.8647 8.02415C9.69141 7.68892 9.60476 7.28693 9.60476 6.81818C9.60476 6.34801 9.69212 5.94602 9.86683 5.61222C10.0415 5.27699 10.2795 5.0206 10.5806 4.84304C10.8817 4.66548 11.2227 4.5767 11.6033 4.5767C11.8462 4.5767 12.0721 4.6108 12.2809 4.67898C12.4897 4.74716 12.6758 4.8473 12.8391 4.9794C13.0025 5.11009 13.1367 5.2706 13.2418 5.46094C13.3484 5.64986 13.418 5.86577 13.4506 6.10866Z"
        fill={fill}
      />
    </svg>
  );
}

function CompareIcon({ active = false }) {
  const stroke = active ? "#132450" : "white";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.71899 11.396H11.095"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.914 4L4.026 13.014"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7889 13.014L7.91394 4"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 7.56201V13"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.199 8.3491C20.267 9.4171 20.267 11.1481 19.199 12.2151C18.131 13.2831 16.4 13.2831 15.333 12.2151C14.265 11.1471 14.265 9.4161 15.333 8.3491C16.4 7.2811 18.132 7.2811 19.199 8.3491"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 17H20"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21H4"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3C11.2044 3 10.4413 3.27092 9.87868 3.75315C9.31607 4.23539 9 4.88944 9 5.57143V12.4286C9 13.1106 9.31607 13.7646 9.87868 14.2468C10.4413 14.7291 11.2044 15 12 15C12.7956 15 13.5587 14.7291 14.1213 14.2468C14.6839 13.7646 15 13.1106 15 12.4286V5.57143C15 4.88944 14.6839 4.23539 14.1213 3.75315C13.5587 3.27092 12.7956 3 12 3Z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 10V11.7778C18 13.428 17.3679 15.0107 16.2426 16.1776C15.1174 17.3444 13.5913 18 12 18C10.4087 18 8.88258 17.3444 7.75736 16.1776C6.63214 15.0107 6 13.428 6 11.7778V10"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18V21"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21H15"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowOnSideBar() {
  return (
    <svg
      className="inline align-middle"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33337 8H12.6667"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 3.33325L12.6667 7.99992L8 12.6666"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 16L16 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21L12 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 19L8 3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15L4 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0537 15.4297L20.0537 10.4297"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.99705 21.0038H19.0029C20.1079 21.0038 21.0037 20.108 21.0037 19.003V4.99717C21.0037 3.89214 20.1079 2.99634 19.0029 2.99634H8.99872C7.89369 2.99634 6.99788 3.89214 6.99788 4.99717V19.003C6.99788 20.108 6.10208 21.0038 4.99705 21.0038V21.0038C3.89202 21.0038 2.99622 20.108 2.99622 19.003V7.99842C2.99622 6.89339 3.89202 5.99759 4.99705 5.99759H6.99788"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4994 6.99801H17.5023"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4994 10.9997H17.5023"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4994 15.0014H17.5023"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
