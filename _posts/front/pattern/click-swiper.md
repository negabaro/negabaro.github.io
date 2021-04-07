이벤트 관련

# click.native


# clickSlide
    @click.native="handleSwiperDOMClick"
    @clickSlide="handleSwiperSlideClick"

이걸 언제 써야할지 모르겠네

착각하지 말아야할게 슬라이드 한페이지에 3개 아이템(swiper-slide)을 표시하면 특정 아이템을 클릭했는지 특정하는것이 아니고

해당 슬라이드에 있는 3개중 뭐 하나를 클릭했는지 확인하는 판단 자료일 뿐..

--------



@click-slide="handleClickSlide"

function handleClickSlide(index: number, reallyIndex: number | null) {
  console.log('Click slide!', index, reallyIndex)
}


https://github.com/surmon-china/surmon-china.github.io/blob/source/projects/vue-awesome-swiper/examples/00-typescript-composition-api.vue