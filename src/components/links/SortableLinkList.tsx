import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import type { Link } from '@/types/link';
import { LinkCard } from './LinkCard';

function SortableLinkItem({
  link,
  onToggleActive,
  onEdit,
  onDelete,
}: {
  link: Link;
  onToggleActive: (link: Link) => void;
  onEdit: (link: Link) => void;
  onDelete: (link: Link) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isDragging ? 'opacity-50' : ''}
    >
      <LinkCard
        link={link}
        onToggleActive={onToggleActive}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

interface SortableLinkListProps {
  links: Link[];
  onReorder: (links: Link[]) => void;
  onToggleActive: (link: Link) => void;
  onEdit: (link: Link) => void;
  onDelete: (link: Link) => void;
}

export function SortableLinkList({
  links,
  onReorder,
  onToggleActive,
  onEdit,
  onDelete,
}: SortableLinkListProps) {
  const [activeLink, setActiveLink] = useState<Link | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const link = links.find((l) => l.id === event.active.id);
    setActiveLink(link ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveLink(null);

    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);

    if (oldIndex < 0 || newIndex < 0) return;

    const reordered = links.map((link, index) => ({
      ...link,
      position: index + 1,
    }));

    const moved = arrayMove(reordered, oldIndex, newIndex).map((link, index) => ({
      ...link,
      position: index + 1,
    }));

    onReorder(moved);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {links.map((link) => (
            <SortableLinkItem
              key={link.id}
              link={link}
              onToggleActive={onToggleActive}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeLink ? (
          <div className="opacity-90">
            <LinkCard
              link={activeLink}
              onToggleActive={() => undefined}
              onEdit={() => undefined}
              onDelete={() => undefined}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}