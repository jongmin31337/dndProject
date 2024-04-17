import type { Identifier, XYCoord } from "dnd-core"; // dnd-core에서 Identifier 및 XYCoord 유형 가져오기
import type { FC } from "react"; // React의 FC(Functional Component) 유형 가져오기
import { useRef } from "react"; // React의 useRef 훅 가져오기
import { useDrag, useDrop } from "react-dnd"; // React DnD에서 useDrag와 useDrop 훅 가져오기

// 스타일 정의
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};

// 항목 유형 정의
export const ItemTypes = {
  CARD: "card",
};

// 카드 컴포넌트의 프로퍼티 정의
export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

// 드래그 아이템 유형 정의
interface DragItem {
  index: number;
  id: string;
  type: string;
}

// 카드 컴포넌트
export const Card: FC<CardProps> = ({ id, text, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null); // ref 생성
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD, // 드롭 대상 유형 지정
    collect(monitor) {
      // 컬렉팅 함수
      return {
        handlerId: monitor.getHandlerId(), // 핸들러 ID 수집
        highlighted: monitor.canDrop(), // 하이라이트 여부 수집
      };
    },
    hover(item: DragItem, monitor) {
      // 호버 이벤트 처리
      if (!ref.current) {
        // 현재 ref가 없으면 반환
        return;
      }

      const dragIndex = item.index; // 드래그 인덱스
      const hoverIndex = index; // 호버 인덱스

      // 자기 자신과 위치를 교체하지 않도록 함
      if (dragIndex === hoverIndex) {
        return;
      }

      // 화면의 사각 영역 결정
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // 수직 중간 가져오기
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 마우스 위치 결정
      const clientOffset = monitor.getClientOffset();

      // 상단으로부터 픽셀 가져오기
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // 마우스가 아이템의 높이의 반을 넘었을 때만 이동 수행
      // 아래로 드래그하는 경우 커서가 50% 아래에 있을 때만 이동
      // 위로 드래그하는 경우 커서가 50% 위에 있을 때만 이동
      // 아이템 위치 변경
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // 실제 작업 수행
      moveCard(dragIndex, hoverIndex);

      // 주의: 여기서 모니터 항목을 변경합니다!
      // 일반적으로 변이를 피하는 것이 좋지만 성능을 위해 여기에서는 변경을 사용합니다.
      // 비싼 인덱스 검색을 피하기 위해
      item.index = hoverIndex;
    },
  });

  // 드래그 속성 수집
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD, // 드래그 유형 지정
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(), // 드래그 중인지 여부 수집
    }),
  });

  // 드래그 중인 경우 불투명도 조절
  const opacity = isDragging ? 0 : 1;

  // 드래그 속성 적용
  drag(drop(ref));

  // 렌더링
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {text}
    </div>
  );
};
