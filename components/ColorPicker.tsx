import React, { useState } from "react";

export default function ColorPicker({
     color,
     selected,
     onChange,
}: {
     color: string;
     selected: boolean;
     onChange: any;
}) {
     return (
          <div>
               <label className="cursor-pointer">
                    <input
                         type="radio"
                         name="color"
                         value={color}
                         onChange={onChange}
                         className="hidden"
                         checked={selected}
                    />
                    <span
                         className={`w-7 h-7 block ${
                              selected && "border-2 scale-125 border-slate-800 dark:border-white"
                         }`}
                         style={{ backgroundColor: color }}
                    ></span>
               </label>
          </div>
     );
}
