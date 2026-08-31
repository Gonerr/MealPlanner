"use client";

import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHouseholds, setSelectedHousehold } from "../householdsSlice";

export default function HouseholdBootstrap() {
  const dispatch = useDispatch<AppDispatch>();

  const initilized = useRef(false);

  const selectedHouseholdId = useSelector(
    (state: RootState) => state.households.selectedHouseholdId
  );

  useEffect(() => {
    if (initilized.current) {
      return;
    }

    initilized.current = true;

    dispatch(fetchHouseholds())
      .unwrap()
      .then((households) => {
        const saved = localStorage.getItem("selectedHouseholdId");

        if (!saved) {
          return;
        }
        const id = Number(saved);

        const exists = households.some((household) => household.id === id);

        if (exists) {
          dispatch(setSelectedHousehold(id));
        }
      })
      .catch(() => {
        // TODO: переход на signup/signin
        // если пользователь еще не авторизован
      });
  }, [dispatch]);

  useEffect(() => {
    if (!selectedHouseholdId) {
      return;
    }

    localStorage.setItem("selectedHouseholdId", String(selectedHouseholdId));
  }, [selectedHouseholdId]);

  return null;
}
