const FoodBackdrop = () => {
  return (
    <div className="food-backdrop" aria-hidden="true">
      <span className="food-orbit food-orbit--peach" />
      <span className="food-orbit food-orbit--green" />
      <span className="food-spark food-spark--one">✦</span>
      <span className="food-spark food-spark--two">✦</span>

      <svg
        className="food-doodle food-doodle--tomato"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M33 34c7-11 18-17 31-17 22 0 40 18 40 42 0 24-17 43-43 43S18 84 18 60c0-10 4-19 10-26"
          fill="#F27B61"
          stroke="#352F28"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M59 28c-8-7-15-7-20-5 3 4 7 8 13 10-1 5 1 10 4 14 5-3 9-8 10-14 7 2 13 1 18-2-5-5-12-8-20-7 0-6-2-11-5-15-3 5-4 11-1 19Z"
          fill="#78905B"
          stroke="#352F28"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M39 68c7 9 21 13 32 6"
          stroke="#352F28"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="food-doodle food-doodle--egg"
        viewBox="0 0 140 120"
        fill="none"
      >
        <path
          d="M22 70c-8-20 9-42 31-43 13-1 21-13 35-12 22 1 24 20 33 33 14 21-2 50-26 53-14 2-24-8-37-7-17 1-29-6-36-24Z"
          fill="#FFF9E8"
          stroke="#352F28"
          strokeWidth="4"
        />
        <circle
          cx="72"
          cy="58"
          r="22"
          fill="#F4C64E"
          stroke="#352F28"
          strokeWidth="4"
        />
        <path
          d="M66 52c4-5 11-6 16-2"
          stroke="#FFF0A8"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="food-doodle food-doodle--bowl"
        viewBox="0 0 150 130"
        fill="none"
      >
        <path
          d="M31 45c13-13 29-18 48-15 15 2 26 11 40 14"
          stroke="#352F28"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M26 52h101c-3 34-21 57-50 57S30 86 26 52Z"
          fill="#AFCB75"
          stroke="#352F28"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M41 66c9 5 16 5 25 0s17-5 26 0 16 5 24 0"
          stroke="#FFF8E7"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M52 112h50"
          stroke="#352F28"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M50 29c-2-8 1-14 8-18M74 26c-2-8 1-14 8-18M98 30c-2-8 1-14 8-18"
          stroke="#E07A5F"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="food-doodle food-doodle--lemon"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M19 66c0-25 22-46 48-46 18 0 34 9 34 30 0 27-25 51-52 51-19 0-30-13-30-35Z"
          fill="#F5D968"
          stroke="#352F28"
          strokeWidth="4"
        />
        <path
          d="M82 25c5-12 15-15 26-13-3 12-12 19-25 17"
          fill="#87A766"
          stroke="#352F28"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M43 76c12 6 26 2 34-8"
          stroke="#352F28"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="food-doodle food-doodle--toast"
        viewBox="0 0 130 120"
        fill="none"
      >
        <path
          d="M24 48c-4-19 14-32 41-32s45 13 41 32l-7 55H31l-7-55Z"
          fill="#DFA86E"
          stroke="#352F28"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M38 51c0-12 11-21 27-21s27 9 27 21l-5 38H43l-5-38Z"
          fill="#F3D2A1"
        />
        <path
          d="M49 63c8 7 24 7 32 0"
          stroke="#352F28"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <svg className="food-doodle food-doodle--avocado" viewBox="0 0 130 150" fill="none">
        <path d="M61 14c24-7 39 13 37 37-1 15 15 27 15 47 0 23-21 40-48 40S17 121 17 98c0-20 16-32 15-47C30 32 41 20 61 14Z" fill="#94AF6D" stroke="#352F28" strokeWidth="4" />
        <path d="M64 29c16-5 26 8 25 25-1 18 13 28 13 44 0 18-15 28-37 28S28 116 28 98c0-17 14-26 13-44-1-14 7-23 23-25Z" fill="#E5D991" />
        <circle cx="65" cy="90" r="21" fill="#B8774E" stroke="#352F28" strokeWidth="4" />
      </svg>
      <svg className="food-doodle food-doodle--carrot" viewBox="0 0 140 145" fill="none">
        <path d="M39 45c18-14 48-10 57 10 7 16-18 56-48 79C35 108 23 65 39 45Z" fill="#F39A54" stroke="#352F28" strokeWidth="4" strokeLinejoin="round" />
        <path d="M59 39C47 24 39 12 44 7c12 2 22 14 25 28C76 15 86 9 98 12c-3 12-10 20-22 30" fill="#83A565" stroke="#352F28" strokeWidth="4" strokeLinejoin="round" />
        <path d="M48 66l16 7m-16 18 13 6m13-35 11 5" stroke="#C76F43" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <svg className="food-doodle food-doodle--strawberry" viewBox="0 0 120 125" fill="none">
        <path d="M25 43c-8 20 4 55 34 72 30-17 43-52 34-72-9-19-26-15-34-8-9-8-26-11-34 8Z" fill="#E7775F" stroke="#352F28" strokeWidth="4" />
        <path d="M59 36c-17 1-24-7-26-17 11-3 20 0 26 9 3-12 12-17 25-15-2 12-8 19-22 23" fill="#8DA869" stroke="#352F28" strokeWidth="4" strokeLinejoin="round" />
        <path d="m38 56 3 4m20-1 3 4m19-6 3 4M46 80l3 4m20-1 3 4M57 98l3 4" stroke="#FFF1D2" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <svg className="food-doodle food-doodle--mushroom" viewBox="0 0 130 130" fill="none">
        <path d="M17 65c0-29 18-49 48-49s48 20 48 49H17Z" fill="#D6A576" stroke="#352F28" strokeWidth="4" strokeLinejoin="round" />
        <path d="M47 65h36l-6 44c-1 9-23 9-24 0L47 65Z" fill="#FFF5E0" stroke="#352F28" strokeWidth="4" />
        <path d="M35 49c8-9 17-14 27-14m25 12 5 5" stroke="#F5D5AE" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default FoodBackdrop;
