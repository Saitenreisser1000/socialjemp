
export const jempToneStore = {
    state: {

        toneNames: [
            { id: 0, name: 'E' },
            { id: 1, name: 'F' },
            { id: 2, name: 'F#' },
            { id: 3, name: 'G' },
            { id: 4, name: 'G#' },
            { id: 5, name: 'A' },
            { id: 6, name: 'Bb' },
            { id: 7, name: 'B' },
            { id: 8, name: 'C' },
            { id: 9, name: 'C#' },
            { id: 10, name: 'D' },
            { id: 11, name: 'D#' }
        ],

        jempToneContainer: [],
        activeBoxContainer: [],
        openDotXPos: 20,
        defaultJempColor: 'indianred',

        seqBoxes: {
            xPos: 0,
            xPosAdd: 40,
            defaultWidth: 20,
        }
    },

    mutations: {
        initJemps(state, stringNr) {
            let start = (stringNr - 1) * this.getters.getFretAmount;
            let end = stringNr * this.getters.getFretAmount;
            let fretNr = 0;

            for (let i = start; i <= end; i++) {
                state.jempToneContainer.push({
                    jt_ID: stringNr.toString() + '|' + fretNr.toString(),
                    fret: fretNr,
                    string: stringNr,

                    color: state.defaultJempColor,
                    showName: '',
                    activeJemps: [],

                    isActive: false,
                    isFocused: false
                });
                fretNr++;
            }
        },

        addDot(state, jempTone) {
            let time = "0:" + (parseInt(state.seqBoxes.xPos / 40) + 1);

            let t = state.jempToneContainer.find(dot => dot.jt_ID === jempTone.jt_ID);
            /******addBox********/
            let newTone = {
                boxData: {
                    xPos: state.seqBoxes.xPos,
                    width: state.seqBoxes.defaultWidth,
                    string: jempTone.string,
                },

                dotColor: state.defaultJempColor,
                time: time,
                isFocused: false,
                jt_ID: jempTone.jt_ID,
                dot_ID: jempTone.jt_ID + '|' + time
            };
            t.activeJemps.push(newTone)

            if (t.activeJemps[0]) {
                jempTone.isActive = true
            }
            state.activeBoxContainer.push(newTone);
            state.seqBoxes.xPos += state.seqBoxes.xPosAdd;
        },

        removeDot(state, dotInfo) {
            let t = state.jempToneContainer.find(dot => dot.jt_ID === dotInfo.jt_ID);
            t.activeJemps = t.activeJemps.filter(aJemps => aJemps.time !== dotInfo.time);
            if (!t.activeJemps[0]) {
                t.isActive = false
            }
            state.activeBoxContainer = state.activeBoxContainer.filter(tones => tones.dot_ID !== dotInfo.dot_ID)
        },

        removeOthersFocus(state, dot) {
            for (let i of state.jempToneContainer) {
                i.isFocused = false;
            }
            dot.isFocused = true
        },

        changeBoxPos(state, box) {
            console.log(box)
        }
    },
    actions: {
        initJemps: ({ commit }, stringNr) => { commit('initJemps', stringNr) },
        removeDot: ({ commit }, dotInfo) => { commit('removeDot', dotInfo) },
        addDot: ({ commit }, dotInfo) => { commit('addDot', dotInfo) },
        removeOthersFocus: ({ commit }, dotInfo) => { commit('removeOthersFocus', dotInfo) },
        changeBoxPos: ({ commit }, box) => { commit('changeBoxPos', box) }

    },
    getters: {
        getAllJemps: (state) => { return state.jempToneContainer },
        getActiveBoxes: (state) => { return state.activeBoxContainer },
        getOpenJempXPos: (state) => { return state.openDotXPos }
    }
};
