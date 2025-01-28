"use client";

// React
import React, { Fragment, useState } from "react";

// Framer Motion
import { motion } from "framer-motion";

// Types
import { IconPropsType } from "@/lib/types/IconPropsType";

type ItemType = {
	name: string;
	icon: React.ElementType<IconPropsType>;
	offsets?: {
		normal: number;
		flipped: number;
	};
	offset?: number;
};

type SelectionBoxPropsType = {
	title: string;
	items: ItemType[];
};

export default function SelectionBox({ title, items }: SelectionBoxPropsType) {
	const [selectedItem, setSelectedItem] = useState<ItemType>(items[0]);

	const handleDragStart = (e: React.DragEvent, item: ItemType) => {
		const originalSvg = e.currentTarget.querySelector("svg");
		const dragIcon = originalSvg?.cloneNode(true) as SVGElement;

		if (dragIcon) {
			dragIcon.style.position = "fixed";
			dragIcon.style.top = "0";
			dragIcon.style.left = "0";
			dragIcon.style.width = "40px";
			dragIcon.style.height = "auto";
			dragIcon.style.pointerEvents = "none";
			dragIcon.style.zIndex = "1000";

			document.body.appendChild(dragIcon);

			e.dataTransfer.setDragImage(dragIcon, 12, 70);

			requestAnimationFrame(() => {
				document.body.removeChild(dragIcon);
			});
		}

		const iconInfo = {
			type: title.toLowerCase(),
			name: item.name,
			category: title === "Notes" ? "Notes" : "Rests",
			variant: item.name.split(" ")[0].toLowerCase(),
			...(title === "Notes"
				? { offsets: item.offsets }
				: { offset: item.offset }),
		};

		e.dataTransfer.setData("application/json", JSON.stringify(iconInfo));
	};

	return (
		<div className="flex flex-col justify-center items-center gap-y-2">
			<label className="text-2xl text-center font-bold">{title}</label>
			<div className="flex flex-wrap justify-center items-center gap-5 max-w-[450px] border-[4px] border-dark rounded-xl p-5">
				{items.map((item, i) => (
					<Fragment key={i}>
						<div className="relative flex justify-center items-center size-14 rounded-md">
							{selectedItem === item && (
								<motion.div
									layoutId={`background-${title}`}
									className="absolute top-0 left-0 size-full border-[3px] border-secondary rounded pointer-events-none"
								>
									<div className="size-full bg-secondary opacity-25"></div>
								</motion.div>
							)}

							<div
								title={item.name}
								draggable
								onDragStart={(e) => handleDragStart(e, item)}
								onClick={() => setSelectedItem(item)}
								className="cursor-pointer z-10"
							>
								<item.icon className="h-10 w-auto fill-dark" />
							</div>
						</div>
						{i !== items.length - 1 ? (
							<div className="flex justify-center items-center h-12 w-auto">
								<div className="h-8 w-[3px] bg-inactive rounded-full"></div>
							</div>
						) : null}
					</Fragment>
				))}
			</div>
			<label className="text-center">
				Selected: <b>{selectedItem.name}</b>
			</label>
		</div>
	);
}
