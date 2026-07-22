import { useMemo, type Dispatch } from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import type { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProp = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProp) {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [],
  );

  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities],
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {isEmptyActivities ? (
        <p className="text-center my-10">No hay actividades aún...</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
          >
            <div className=" capitalize space-y-2 relative">
              <p
                className={`absolute -top-8 -left-12 px-10 py-2 text-white uppercase font-bold 
                ${activity.category === 1 ? "bg-[#96afee]" : "bg-[#c4abf0]"}`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5 text-gray-700">
                {activity.name}
              </p>
              <p className="font-black text-4xl text-[#d3ec59]">
                {activity.calories} {""}
                <span>Calorias</span>
              </p>
            </div>

            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activeId",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className="h-8 w-8 text-gray-700 cursor-pointer" />
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: { id: activity.id },
                  })
                }
              >
                <XCircleIcon className="h-8 w-8 text-red-400 cursor-pointer" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
