function push(event, data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export function trackPhoneClick(location) {
  push('phone_click', {
    phone_number: '+306973857378',
    click_location: location,
  });
}

export function trackWhatsAppClick(location) {
  push('whatsapp_click', {
    phone_number: '+306973857378',
    click_location: location,
  });
}

export function trackFormSubmit(formName, bookingType) {
  push('form_submit', {
    form_name: formName,
    booking_type: bookingType,
  });
}

export function trackOpenWidgetClick() {
  push('openwidget_click');
}
