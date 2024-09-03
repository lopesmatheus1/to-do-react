/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types'
import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel'
import { forwardRef } from 'react'

const TimeSelect = forwardRef(({ errorMessage, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

TimeSelect.displayName = 'TimeSelect'
TimeSelect.propTypes = {
  errorMessage: PropTypes.string,
}

export default TimeSelect
