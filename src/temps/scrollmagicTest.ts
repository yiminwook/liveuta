// useEffect(() => {
//   //@ts-ignore
//   const controller = new window.ScrollMagic.Controller();

//   // 가로 스크롤 섹션의 전체 가로 이동 거리 (예: 50%만큼 왼쪽으로 이동시키기)
//   // 실제 width가 200%이므로, 100% -> 화면 한 너비만큼 옮기는 셈
//   const horizontalMove = '-50%';

//   // GSAP 트윈(애니메이션) 생성
//   // #horizontal-section을 X축으로 -50% 이동
//   //@ts-ignore
//   const horizontalTween = window.gsap.to(scrollRef.current, {
//     x: horizontalMove,
//     ease: 'none', // 스크롤에 따라 자연스럽게 움직이도록 가감속X
//     duration: 1, // ScrollMagic의 duration과 별개 (상대적 비율)
//   });

//   // ScrollMagic Scene 생성
//   //@ts-ignore
//   new window.ScrollMagic.Scene({
//     triggerElement: wrapperRef.current, // 이 지점에서 시작
//     triggerHook: 0.8, // 뷰포트의 최상단(0)에 트리거가 걸림
//     offset: 0,
//     duration: '100%', // 스크롤 얼마나 해야 애니메이션이 끝날지 결정(예: 2배 뷰 높이)
//   })
//     .setPin(wrapperRef.current, { pushFollowers: false }) // 해당 섹션을 고정(pin)
//     .setTween(horizontalTween) // 가로 이동 트윈 적용
//     .addTo(controller);
// }, []);