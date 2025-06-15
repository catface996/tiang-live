import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';
import { setPageTitle } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../store';
import { setDefinitions, setLoading, setError } from '../../store/slices/simplePlaneSlice';
import { planeService } from '../../services/planeService';
import PlaneForm from '../../components/Plane/PlaneForm';
import type { PlaneDefinition } from '../../types';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 24px 0;
`;

const PlaneCreateEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  
  const { definitions: planes, loading } = useAppSelector(state => state.plane);
  const [currentPlane, setCurrentPlane] = useState<PlaneDefinition | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = Boolean(id);
  const mode = isEditMode ? 'edit' : 'create';

  useEffect(() => {
    setPageTitle(isEditMode ? '编辑平面' : '创建平面');
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      dispatch(setLoading({ type: 'definitions', loading: true }));

      // 加载所有平面数据
      const planesResponse = await planeService.getPlaneDefinitions();
      dispatch(setDefinitions(planesResponse.data));

      // 如果是编辑模式，查找当前平面
      if (isEditMode && id) {
        const plane = planesResponse.data.find((p: PlaneDefinition) => p.id === id);
        if (plane) {
          setCurrentPlane(plane);
        } else {
          message.error('未找到指定的平面');
          navigate('/planes');
        }
      }
    } catch (error: any) {
      dispatch(setError({ type: 'definitions', error: error.message || '加载数据失败' }));
      message.error('加载数据失败');
    }
  };

  const handleSubmit = async (formData: Partial<PlaneDefinition>) => {
    setSubmitting(true);
    try {
      if (isEditMode && id) {
        // 编辑模式
        await planeService.updatePlaneDefinition(id, formData);
        message.success('平面更新成功');
      } else {
        // 创建模式
        await planeService.createPlaneDefinition(formData);
        message.success('平面创建成功');
      }
      
      // 返回平面管理页面
      navigate('/planes');
    } catch (error: any) {
      message.error(error.message || `${isEditMode ? '更新' : '创建'}平面失败`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/planes');
  };

  if (loading.definitions) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', paddingTop: '20vh' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16, color: '#666' }}>
            加载数据中...
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PlaneForm
        mode={mode}
        initialData={currentPlane || undefined}
        existingPlanes={planes}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={submitting}
      />
    </PageContainer>
  );
};

export default PlaneCreateEdit;
