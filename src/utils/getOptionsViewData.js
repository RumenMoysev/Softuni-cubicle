exports.getOptionsViewData = (currentLevel) => {
    const arr = []

    const levels = ['Very easy', 'Easy', 'Medium (Standard 3x3)', 'Intermediate', 'Expert', 'Hardcore']

    for (let i = 0; i < levels.length; i++) {
        if (Number(currentLevel) === i + 1) {
            const optionObj = {
                level: i + 1,
                value: levels[i],
                isSelected: true
            }

            arr.push(optionObj)
        } else {
            const optionObj = {
                level: i + 1,
                value: levels[i]
            }

            arr.push(optionObj)
        }
    }
    return arr
}