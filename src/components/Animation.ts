export const defaultDuration = 1
export const defaultEase = [0.43, 0.13,0.23, 0.96];

export const defaultTransition={
    duration:1.25,
    ease: defaultEase
}

export const SingleProjectPageTransition = {
    initial:{
        opacity:0,
        y:100
    },
    animate:{
        opacity:1,
        y:0
    }
}

export const LoaderTransition = {
    initial:{
        y:50,
        opacity:0
    },
    animate:{
        y:0,
        opacity:1
    }
}