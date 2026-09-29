"use client";

import { AppDispatch, RootState } from "@/app/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHouseholds, setSelectedHousehold } from "../householdsSlice";

export default function HouseholdBootstrap() {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const selectedHouseholdId = useSelector(
    (state: RootState) => state.households.selectedHouseholdId
  );

  useEffect(() => {
    if (pathname === "/login") return;

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
      .catch(() => {});
  }, [dispatch, pathname]);

  useEffect(() => {
    if (!selectedHouseholdId) {
      return;
    }

    localStorage.setItem("selectedHouseholdId", String(selectedHouseholdId));
  }, [selectedHouseholdId]);

  return null;
}
