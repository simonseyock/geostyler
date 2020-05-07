/* Released under the BSD 2-Clause License
 *
 * Copyright (c) 2018-present, terrestris GmbH & Co. KG
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import * as React from 'react';

import { ColorMapEntry } from 'geostyler-style';
import ColorField from '../ColorField/ColorField';
import OffsetField from '../OffsetField/OffsetField';
import { Input, Form } from 'antd';
import OpacityField from '../OpacityField/OpacityField';
import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';

const _get = require('lodash/get');

// i18n
export interface ColorMapEntryFieldLocale {
  colorLabel?: string;
  quantityLabel?: string;
  labelLabel?: string;
  opacityLabel?: string;
}

interface ColorMapEntryFieldDefaultProps {
  labelPlaceholder: string;
  locale: ColorMapEntryFieldLocale;
}

// non default props
export interface ColorMapEntryFieldProps extends Partial<ColorMapEntryFieldDefaultProps> {
  onChange?: (colorMapEntry: ColorMapEntry) => void;
  colorMapEntry?: ColorMapEntry;
}

/**
 * ColorMapEntry Field
 */
export class ColorMapEntryField extends React.PureComponent<ColorMapEntryFieldProps> {

  static componentName = 'ColorMapEntryField';

  public static defaultProps: ColorMapEntryFieldDefaultProps = {
    labelPlaceholder: 'Color Map Label',
    locale: en_US.GsColorMapEntryField
  };

  updateColorMapEntry = (prop: string, value: any) => {
    const {
      colorMapEntry,
      onChange
    } = this.props;
    let updated: ColorMapEntry = {...colorMapEntry};
    updated[prop] = value;
    if (onChange) {
      onChange(updated);
    }
  }

  onColorChange = (color: string) => {
    this.updateColorMapEntry('color', color);
  }

  onQuantityChange = (quantity: number) => {
    this.updateColorMapEntry('quantity', quantity);
  }

  onLabelChange = (label: string) => {
   this.updateColorMapEntry('label', label);
  }

  onOpacityChange = (opacity: number) => {
    this.updateColorMapEntry('opacity', opacity);
  }

  render() {
    const {
      colorMapEntry,
      labelPlaceholder,
      locale
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div>
        <Form.Item
          label={locale.colorLabel}
          {...formItemLayout}
        >
          <ColorField
            color={_get(colorMapEntry, 'color')}
            onChange={this.onColorChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.quantityLabel}
          {...formItemLayout}
        >
          <OffsetField
            offset={_get(colorMapEntry, 'quantity')}
            onChange={this.onQuantityChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.labelLabel}
          {...formItemLayout}
        >
          <Input
            className="editor-field colormapentry-label-field"
            defaultValue={_get(colorMapEntry, 'label')}
            value={_get(colorMapEntry, 'label')}
            placeholder={labelPlaceholder}
            onChange={(evt: any) => {
              this.onLabelChange(evt.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label={locale.opacityLabel}
          {...formItemLayout}
        >
          <OpacityField
            opacity={_get(colorMapEntry, 'opacity')}
            onChange={this.onOpacityChange}
          />
        </Form.Item>
      </div>
    );
  }
}

export default localize(ColorMapEntryField, ColorMapEntryField.componentName);
