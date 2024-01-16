import React, { useRef, useEffect, useMemo } from 'react';
import { Transformer } from 'react-konva';
import { useEditorContext } from '../../contexts/editor-provider/editor-provider';
import { Konva, ObjectScheme } from '../../types';
import EditorImage, { EditorImageProps } from '../editor-image/editor-image';
import EditorText, { EditorTextProps } from '../editor-text/editor-text';

export interface EditorObjectProps {
  object: ObjectScheme;
  id: string;
}

export interface ObjectRenderer {
  text: (props: EditorTextProps) => JSX.Element;
  image: (props: EditorImageProps) => JSX.Element;
}

const objectRenderer: ObjectRenderer = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  image: EditorImage,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  text: EditorText,
};

export function EditorObject({ id, object }: EditorObjectProps) {
  const { actions, setFocusedId, focusedId, focusedNodeRef } =
    useEditorContext();
  const Component = objectRenderer[object.type];
  const objectRef = useRef<Konva.Node>();
  const transformerRef = useRef<Konva.Transformer>();

  const isSelected = useMemo(() => focusedId === id, [focusedId, id]);

  useEffect(() => {
    if (isSelected) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      focusedNodeRef.current = objectRef.current;
    }

    if (isSelected && objectRef.current && transformerRef.current) {
      transformerRef.current.nodes([objectRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, focusedNodeRef]);

  if (!Component) return null;

  return (
    <>
      <Component
        ref={objectRef}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        object={object}
        onClick={() => setFocusedId(id)}
        onTap={() => setFocusedId(id)}
        onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
          actions.set(id, {
            ...object,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e: Konva.KonvaEventObject<Event>) => {
          const node = objectRef.current;
          if (!node) return;

          actions.set(id, {
            ...object,
            x: node.x(),
            y: node.y(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //  @ts-ignore
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 100) {
              return oldBox;
            }

            return newBox;
          }}
        />
      )}
    </>
  );
}

export default EditorObject;
