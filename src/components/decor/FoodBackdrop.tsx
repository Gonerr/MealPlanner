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
    </div>
  );
};

export default FoodBackdrop;
