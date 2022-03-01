;(function () {
    'use strict'

    const get = (target) => {
        return document.querySelector(target)
    }

    class Carousel {
        constructor(carouselElement) {
            this.carouselElement = carouselElement
            this.itemClassName = 'carousel_item';
            this.items = this.carouselElement.querySelectorAll('.carousel_item') // 유사배열객체
            
            this.totalItems = this.items.length; // items의 총 갯수, 5
            this.current = 0 // 현재 인덱스

            // 움직임 체크
            this.isMoving = false; // true일때 버튼이 동작하지 않도록
        }

        // 초기설정 - 초기화
        initCarousel() {
            this.isMoving = false;
            this.items[this.totalItems - 1].classList.add('prev')
            this.items[0].classList.add('active')
            this.items[1].classList.add('next')
        }


        // 이벤트 등록
        setEventListener() {
            this.prevButton = this.carouselElement.querySelector(
                '.carousel_button--prev'
            );
            this.nextButton = this.carouselElement.querySelector(
                '.carousel_button--next'
            );

            this.prevButton.addEventListener('click', () => {
                this.movePrev()
            })
            this.nextButton.addEventListener('click', () => {
                this.moveNext()
            })
        }

        
        moveCarouselTo() {
            // 버튼 동작 제어
            if (this.isMoving) return;
            this.disabledInteraction()

            let prev = this.current - 1
            let next = this.current + 1

            // 끝값일 경우 예외처리
            if (this.current === 0) {
                prev = this.totalItems - 1
            }
            else if (this.current === this.totalItems - 1) {
                next = 0
            }

            // class 추가해서 동작
            for (let i = 0; i < this.totalItems; i++) {
                if (i === this.current) {
                    this.items[i].className = this.itemClassName + ' active' // 띄어쓰기 주의
                } 
                else if (i === prev) {
                    this.items[i].className = this.itemClassName + ' prev'
                } 
                else if (i === next) {
                    this.items[i].className = this.itemClassName + ' next'
                } 
                else {
                    this.items[i].className = this.itemClassName
                }
            }
        }


        // 다음
        moveNext() {
            if (this.isMoving) return;

            if (this.current === this.totalItems - 1) {
                this.current = 0
            }
            else {
                this.current++
            }
            // 동작
            this.moveCarouselTo()
        }
        
        // 이전
        movePrev() {
            if (this.isMoving) return;

            if (this.current === 0) {
                this.current = this.totalItems - 1
            }
            else {
                this.current--
            }
            // 동작
            this.moveCarouselTo()
        }


        // 버튼 동작 제어
        disabledInteraction() {
            this.isMoving = true;
            setTimeout(() => {
                this.isMoving = false
            }, 500); // 0.5초 뒤에 false로 변경
        }


    }


    // DOM Load 시 이벤트 등록
    document.addEventListener('DOMContentLoaded', () => {
        const carouselElement = get('.carousel');
        const carousel = new Carousel(carouselElement); // 인스턴스 생성
        carousel.initCarousel()
        carousel.setEventListener()
    })
})()