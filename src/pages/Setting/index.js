import React, { useEffect, useMemo, useState } from 'react';
import { RequestGet, RequestPost } from '../../services/RequestService';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const Setting = (props) => {
  const [setting, setSetting] = useState({
    maxAmount: 1,
    alertPerc: 100
  });
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: useMemo(() => {
      return setting;
    }, [setting])
  });

  useEffect(() => {
    GetUserSetting();
  }, [])

  useEffect(() => {
    reset(setting);
  }, [setting])

  const GetUserSetting = async () => {
    const res = await RequestGet('/users/setting');
    if (res.success) {
      setSetting(res.data.setting);
    }
  }

  const onSubmit = async (data) => {
    const res = await RequestPost(`/users/setting`, { maxAmount: parseFloat(data.maxAmount), alertPerc: parseFloat(data.alertPerc) });
    if (res.success) {
      return toast.success(`Setting saved`);
    }
    toast.error(res.message);
  }

  return (
    <div class="row m-0 px-md-5 px-3">
      <h1 class="mb-5">Configure the Auto-bidding</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h4>Maximum bid amount</h4>
      <p><i>This maximum amount will be split between all items where we have activated auto-bidding</i></p>
      <div class="col-12 col-md-4 mb-5">        
        <div class="input-group mb-3">
          <span class="input-group-text">$</span>
          <input {...register("maxAmount", { min: {
            value: 1,
            message: 'The max amount must be greater than $1'
          } })} type="number" name="maxAmount" class="form-control" aria-label="Amount" />
        </div>
        <ErrorMessage
          errors={errors}
          name="maxAmount"
          render={({ message }) => <p class="text-danger">{message}</p>}
        />
      </div>

      <h4>Bid Alert notification</h4>
      <p><i>Get the notification about your reserved bids</i></p>
      <div class="col-12 col-md-4 mb-5">        
        <div class="input-group mb-2">
          <input {...register("alertPerc", { min: {
            value: 50,
            message: 'Lowest percentage allowed is 50'
          }, max: {
            value: 100,
            message: 'Highest percentage allowed is 100'
          } })} type="number" class="form-control" name="alertPerc" aria-label="Percent" />
          <span class="input-group-text">%</span>
        </div>
        <ErrorMessage
          errors={errors}
          name="alertPerc"
          render={({ message }) => <p class="text-danger">{message}</p>}
        />
      </div>
      
      <input type="submit" class="col-12 col-md-4 mb-3 btn btn-primary" value="Save" />
      </form>

    </div>
  )
}

export default Setting;
